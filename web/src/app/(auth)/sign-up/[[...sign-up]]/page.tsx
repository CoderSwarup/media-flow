import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="border border-red-100 overflow-hidden rounded-xl dark:border-gray-300">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#fff",
            colorText: "#fff",
            colorBackground: "#000",
          },
          elements: {
            formButtonPrimary: "bg-blue-600 text-white hover:bg-blue-700",
            formButtonSecondary: "bg-gray-300 text-black hover:bg-gray-400",
            socialButtonsBlockButtonText__google: "text-white",
            socialButtonsBlockButton__google: "bg-blue-500 hover:text-red-200",
          },
        }}
      />
    </div>
  );
}
