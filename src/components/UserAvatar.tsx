"use client"

import { auth } from "../../firebase"
import Image from "next/image"

export default function UserAvatar() {
  const user = auth.currentUser

  if (!user) return null

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200">
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt="User avatar"
            fill
            className="object-cover"
            unoptimized={true}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <span className="font-medium text-gray-600">
              {user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <span className="hidden md:inline">
        {user.displayName || user.email?.split('@')[0]}
      </span>
    </div>
  )
}