import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import { getSortedPostsData } from "../../lib/posts";
import Link from "next/link";
import Date from "../../components/date";
import { GetStaticProps } from "next";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-xlg leading-6">
        <p>Hard player, hard worker</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className="text-xlg leading-6">
        <h2 className="mb-4 mt-4 text-4xl font-bold">Blog</h2>
        <ul className=".p-0 m-0 list-none">
          {allPostsData.map(({ id, date, title }) => (
            <li className="mb-5 mr-0 mt-0" key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className="text-gray-500">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
