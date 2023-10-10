import Ajv, { ErrorObject, KeywordDefinition } from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
ajvErrors(ajv);

const propertyValues: { [key: string]: string[] } = {
  role: ["admin", "vendor", "client"],
};

// Define the custom keyword to validate properties
const validatePropertyKeyword: KeywordDefinition = {
  keyword: "validateProperty",
  type: "object",
  validate: function (schema: any, data: any) {
    let errors: ErrorObject[] = [];
    for (const key in schema) {
      if (data.hasOwnProperty(key)) {
        const allowedValues = propertyValues[key];
        const propertyValue = data[key];
        if (!allowedValues.includes(propertyValue)) {
          throw new Error(
            `The value of '${key}' must be one of the following: ${allowedValues.join(
              ", "
            )}.`
          );
        }
      }
    }

    return true;
  },
};
ajv.addKeyword(validatePropertyKeyword);

export default function validate(schema) {
  return (req, res, next) => {
    const param = [req.body ?? {}, req.query ?? {}, req.params ?? {}].reduce(
      function (r, o) {
        Object.keys(o).forEach(function (k) {
          r[k] = o[k];
        });
        return r;
      },
      {}
    );

    console.log("validate param: ", param);

    const valid = ajv.validate(schema, param);
    if (!valid) {
      console.log("invalid data");
      console.log("res.status: ", typeof res.status);

      if (typeof res.status != "undefined") {
        res.status(400).json({
          error: ajv.errorsText(),
        });
      } else {
        return {
          props: {
            error: ajv.errorsText(),
          },
        };
      }
    } else {
      if (typeof document == "undefined") {
        return next();
      } else {
        next();
      }
    }
  };
}

export function validateSSR(schema) {
  return (context) => {
    const param = context.query;

    console.log(param);

    return ajv.validate(schema, param);
  };
}

export const validateProps = {
  queryId: { type: "string", pattern: "\\d" },
  id: { type: "number", minimum: 0 },
  email: { type: "string", format: "email" },
  password: { type: "string", format: "password", minLength: 8 },
};
