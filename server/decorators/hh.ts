/*
protected message(text, code = TOAST, htpp = 200)

protected createMessage({
   message,
   code = CODES.TOAST,
   http_code = 200,  // 200, 400, 404
}) {
    this.successMessage = successMessage
    this.failMessage = failMessage
    this.successCode = successCode
    this.failCode = failCode
}

private clearMessage() {
    this.successMessage = ''
    this.failMessage = ''
    this.successCode = ''
    this.failCode = ''
}


const response = {
                            data,
                            message: this.successMessage || 'Ok',
                            code: this.successCode,
                        }
                        this.clearMessage()
                        return res.status(200).json(response)
                        // sequelize errors
                    } catch (err: any) {
                        const message = err?.message ? err.message : err
                        return res.status(500).json({
                            data: [],
                            message,
                            code: CODES.TOAST,
                        })
                    }


                    this.message('Goods fetched');
                    this.message('goods-fetched');  // ua, en, pl,

                    this.createMessage({
                        message: 'Goods fetched',
                        successCode: CODES.DEBUG,
                        failCode: CODES.TOAST,
                    })
                    */