    import React, { useEffect } from 'react';
import { useUser, useClerk, useAuth } from '@clerk/clerk-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuItem, 
  DropdownMenuContent 
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUser, FiLogOut } from 'react-icons/fi';

const UserAvatar = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  useEffect(() => {
   const token = getToken();
 console.log(token);
    console.log(token);
  }, []);
  const { signOut } = useClerk();

  return (
    <div className="relative flex items-center">
      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none">
            <Avatar>
              <AvatarImage src={user?.imageUrl || 'https://github.com/shadcn.png'} alt="User Avatar" />
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

    
        <DropdownMenuContent asChild align="end" className="w-56">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5"
          >
            <DropdownMenuItem asChild>
              <Link href="/account" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <FiUser />
                <span>Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => signOut()} 
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <FiLogOut />
              <span>Logout</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAvatar;
