
import React from "react";
import { UserProfile as UserProfileType } from "../../../api/asset-generator/types";
import { User } from "lucide-react";

interface UserProfileProps {
  user: UserProfileType;
  variant?: 'small' | 'medium' | 'large';
  avatarOnly?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  variant = 'medium',
  avatarOnly = false 
}) => {
  const sizeClasses = {
    small: "h-8 w-8 text-xs",
    medium: "h-12 w-12 text-sm",
    large: "h-16 w-16 text-base"
  };
  
  const avatarSize = sizeClasses[variant];
  
  return (
    <div className="flex items-center gap-3">
      <div className={`${avatarSize} rounded-full overflow-hidden bg-muted flex items-center justify-center`}>
        {user.imageUrl ? (
          <img 
            src={user.imageUrl} 
            alt={user.name} 
            className="h-full w-full object-cover" 
          />
        ) : (
          <User className="h-1/2 w-1/2 text-muted-foreground" />
        )}
      </div>
      
      {!avatarOnly && (
        <div className="flex flex-col">
          <span className="font-medium leading-tight">{user.name}</span>
          {(user.title || user.company) && (
            <span className="text-muted-foreground text-xs leading-tight">
              {user.title}{user.title && user.company && " at "}{user.company}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
