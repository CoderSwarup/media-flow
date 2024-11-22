import ProfileForm from "@/components/forms/profile-form";
import { db } from "@/lib/db";
import React from "react";
import ProfilePicture from "./_components/profile-picture";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
type Props = {};

const Settings = async (props: Props) => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const user = await db.user.findUnique({ where: { clerkId: authUser.id } });

  const removeProfileImage = async () => {
    "use server";
    const response = await db.user.update({
      where: { clerkId: authUser.id },
      data: { profileImage: "" },
    });
  };

  const uploadProfileImage = async (image: string) => {
    "use server";
    const response = await db.user.update({
      where: { clerkId: authUser.id },
      data: { profileImage: image },
    });
  };

  const updateUserInfo = async (name: string) => {
    "use server";

    const updateUser = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        name,
      },
    });
    return updateUser;
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className=" top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>

        <div className="flex flex-col items-center justify-start gap-10 md:gap-[100px] md:flex-row">
          <ProfilePicture
            userImage={user?.profileImage || ""}
            onDelete={removeProfileImage}
            onUpload={uploadProfileImage}
          />
          <div className="flex-1 w-full md:max-w-[400px]">
            <ProfileForm user={user} onUpdate={updateUserInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
