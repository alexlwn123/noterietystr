import { useQRCode } from "next-qrcode";

export default (invoice) => {
  const text = `lightning:${invoice.invoice}`
  const { Canvas } = useQRCode();

  return invoice ? (
    <a href={text}>
      <Canvas
        text={text}
        options={{
          //@ts-ignore
          level: "L",
          margin: 3,
          scale: 4,
          width: 300,
          color: {
            dark: "#010599FF",
            light: "#FFBF60FF",
          },
        }}
      />
    </a>
  ) : <h1>LOADING</h1>;

}