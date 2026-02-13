import { BASE_URL } from "./apiPaths";

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    let initials = "";
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
    return initials.toUpperCase();
};

export const getAvatarUrl = (profileUrl, name) => {
    if (profileUrl) {
        if (profileUrl.startsWith("http")) return profileUrl;
        return `${BASE_URL}/${profileUrl}`;
    }
    if (!name) return "";

    return `https://ui-avatars.com/api/?name=${getInitials(name)}&background=random&color=fff&size=150`;
};