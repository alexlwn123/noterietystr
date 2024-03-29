"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import {
  Header,
  CurrentWinner,
  Footer,
  Countdown,
  Jackpot,
  Invoice,
  Loading,
  Input,
} from "@/components";
// import usePusher from '@/hooks/usePusher';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { checkInvoiceStatus, validateLnurl } from "./utils";
import { v4 } from "uuid";

export default function Home() {
  const [invoice, setInvoice] = useState(null);
  const [hash, setHash] = useState<string | null>(null);
  const [settled, setSettled] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [uuid, setUuid] = useState<string>();
  const [refetch, setRefetch] = useState(false);
  const [countdownKey, setCountdownKey] = useState<number>(0);
  const [fetching, setFetching] = useState(false);
  const [checking, setChecking] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const initialRender = useRef(true);

  // const { lnAddress, timestamp, jackpot, status, setStatus, memberCount } = usePusher();

  // validate user input
  useEffect(() => {
    const delayedValidate = setTimeout(async () => {
      setIsValidatingAddress(true);
      const res = await validateLnurl(userAddress);
      setIsValidatingAddress(false);
      console.log(res);
      setIsValidAddress(res.valid);
    }, 300);
    return () => clearTimeout(delayedValidate);
  }, [userAddress]);


  // get lnaddr from local storage
  useEffect(() => {
    const lnaddr = localStorage.getItem("lnaddr");
    const uuid = localStorage.getItem("uuid");
    if (lnaddr) {
      setUserAddress(lnaddr);
    }
    if (uuid) {
      setUuid(uuid);
    } else {
      const id = v4();
      localStorage.setItem("uuid", id);
      setUuid(id);
    }
  }, []);


  // Get invoice
  useEffect(() => {
    if (fetching || hash) return;
    setFetching(true);
    fetch("/api/invoice", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        setInvoice(data.payment_request);
        setHash(data.payment_hash);
        setSettled(false);
        setFetching(false);
      });
  }, [refetch, hash]);

  // Check invoice
  // useEffect(() => {
  //   if (settled || !hash || status === 'LOADING' || checking) return;
  //   const interval = setInterval(() => {
  //     if (checking) return;
  //     checkInvoiceStatus(setChecking, hash, setHash, setSettled, toast, userAddress, setCountdownKey);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [hash, fetching, status, userAddress, settled, checking]);

  return (
    <main className={styles.main}>

      <ToastContainer
        hideProgressBar={true}
        autoClose={3000}
        pauseOnFocusLoss={false}
        theme="dark"
        closeButton={false}
      />
      <Header />
      <Loading isLoading={!!invoice}>
        {/* <Jackpot jackpotSats={status === 'LIVE' ? jackpot : 0} /> */}
        <div className={styles.center}>
          <div className={styles.stack}>
            <Input
              placeholder={"npup...."}
              onChange={(e) => setUserAddress(e.target.value)}
              value={userAddress}
              isValidAddress={isValidAddress}
              isValidating={isValidatingAddress}
            />
            {/* <div className={styles.online}>Players Online: <b>{memberCount}</b></div> */}
          </div>
          {/* {userAddress && isValidAddress && <Invoice invoice={invoice} toast={toast} />} */}
        </div>
      </Loading>
      <Footer />
    </main>
  );
}
