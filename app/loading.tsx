import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[55vh]">
      <Image alt="loader" width={100} height={100} src="/svg/loader.svg" />
    </div>
  );
}
