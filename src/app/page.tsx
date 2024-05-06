import Image from "next/image";
import styles from "./page.module.css";
import {MyForm} from "@/app/MyForm/MyForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <MyForm />
      </div>
    </main>
  );
}
