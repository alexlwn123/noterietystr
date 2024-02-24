import { fromSats } from 'satcomma';

export const validateLnurl = async (lnurl: string) => {
  const url = `/api/validate?lnurl=${encodeURIComponent(lnurl)}`;
  const res = await fetch(url, { method: 'GET', });
  const data = await res.json();
  if (res.status === 200 && data.domain) {
    return { valid: true, domain: data.domain };
  } else {
    return { valid: false };
  }
}

export const checkInvoiceStatus = (setChecking, hash, setHash, setSettled, toast, userAddress, setCountdownKey) => {
  setChecking(true);
  const url = `/api/invoice?hash=${encodeURIComponent(hash!)}&lnaddr=${userAddress}`
  fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
      if (data.settled) {
        setSettled(data.settled && true);
        localStorage.setItem('lnaddr', userAddress);
        setCountdownKey(prevKey => prevKey + 1);
        setHash(null);
        toast("Bid Received! You're in the lead!", { type: 'success' });
      }
      setChecking(false);
    }).catch(_ => setChecking(false));
}