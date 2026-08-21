import { Spinner } from "./ui/spinner";

export default function LoadingPage() {
  return (
    <div className="w-full h-full">
      <div className="h-screen bg-primary/70 flex justify-center items-center text-white">
        <div className="flex justify-center items-center gap-2">
          <Spinner className="text-white h-8 w-8" /> <span className="text-white text-lg">Loading...</span>
        </div>
      </div>
    </div>
  );
}
