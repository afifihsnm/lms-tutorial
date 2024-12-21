import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const TeacherLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return <>{children}</>
}

export default TeacherLayout;