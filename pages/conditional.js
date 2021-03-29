import Head from "next/head";
import styles from "../styles/Home.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Conditional() {
  const { t } = useTranslation("common");
  let user = undefined;

  // server environment
  if (typeof window === undefined) {
    user = undefined;
  } else {
    const getData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const response = res.json();
      return response;
    };
    user = getData();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Conditionals</h1>
        <h2>This is an inline ternary checking if user exists</h2>
        {user ? t("one") : t("two")}
        <br />
        <h2>This is an inline ternary checking if user does NOT exist</h2>
        {!user ? t("one") : t("two")}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
