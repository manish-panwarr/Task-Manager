import React from "react";

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
    return (
        <div className="flex items-center">
            {avatars.slice(0, maxVisible).map((avatar, index) => (
                <img
                    key={index}
                    src={avatar}            // should be high-resolution image
                    alt={`Avatar ${index + 1}`}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover first:ml-0"
                    style={{ marginLeft: index > 0 ? "-12px" : 0 }}
                />
            ))}
            {avatars.length > maxVisible && (
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white ml-[-12px]">
                    +{avatars.length - maxVisible}
                </div>
            )}
        </div>
    );
};

export default AvatarGroup;