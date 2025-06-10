// Using a more generic name as it contains various icons, not just editor-specific
// Grouping icons here for simplicity in this specific project structure
import React from 'react';

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  title?: string; // Explicitly add title to satisfy AdminDashboardPage usage
}

export const SearchIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export const SearchIconChatHeader: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props} className={`w-5 h-5 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);


export const UsersIcon: React.FC<SVGProps> = (props) => ( // For groups or new chat (outline) - General purpose
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72M12 12.75a5.25 5.25 0 0 0-5.25 5.25M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const MegaphoneIcon: React.FC<SVGProps> = (props) => ( // For channels
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 3.94A10.452 10.452 0 0 0 3.94 10.34L1.66 9.044a13.5 13.5 0 0 1 9.027-7.413l.653 2.31Zm8.693 1.417L18.38 3.047a13.5 13.5 0 0 1 7.413 9.027l-2.31.653A10.453 10.453 0 0 0 19.033 5.357ZM3.94 13.66A10.452 10.452 0 0 0 10.34 20.06l.653-2.31a10.453 10.453 0 0 0-7.413-9.027L1.66 14.956Zm15.093.653.653 2.31a13.501 13.501 0 0 1-7.413 9.027l-2.31-.653A10.453 10.453 0 0 0 19.033 14.313Zm-5.425-3.505a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM12 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
  </svg>
);

export const SunIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a2.25 2.25 0 0 0-2.25 2.25c0 1.31.934 2.341 2.132 2.341.089 0 .177-.007.264-.021M12 12a2.25 2.25 0 0 1 2.25-2.25c0-1.31-.934-2.341-2.132-2.341A2.252 2.252 0 0 0 12 7.236V12Z" />
  </svg>
);

export const MoonIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

export const PaperClipIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3.375 3.375 0 1 1 18.375 12.74Z" />
  </svg>
);

export const FaceSmileIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9 9.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm6 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
);

export const SparklesIcon: React.FC<SVGProps> = (props) => ( // For AI features
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L21 5.25l-.813 2.846a4.5 4.5 0 0 0-3.09 3.09L14.25 12l2.846.813a4.5 4.5 0 0 0 3.09 3.09L21 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09Z" />
  </svg>
);

export const PaperAirplaneIcon: React.FC<SVGProps> = (props) => ( // Send icon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
);

export const PhoneFilledIcon: React.FC<SVGProps> = (props) => ( // For Calls
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.279-.088.401A11.982 11.982 0 0 0 18 18.75c.122-.076.299-.047.4-.088l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C6.55 22.5 1.5 17.45 1.5 9.75V4.5Z" clipRule="evenodd" />
  </svg>
);


export const VideoCameraIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
  </svg>
);

export const InformationCircleIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
);

export const UserCircleIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const BellIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
  </svg>
);

export const PhotoIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

export const DocumentTextIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

export const PaletteIcon: React.FC<SVGProps> = (props) => ( // For avatar color picker
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.402-6.402M10.5 9a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM10.5 9h4.5m2.25 0a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Zm0 0h-.008c-.386 0-.762.024-1.134.073L13.5 7.5M10.5 9h-.008c-.386 0-.762.024-1.134.073L9 7.5M15 12a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Zm0 0h4.5m-4.5 0h-.008c-.386 0-.762.024-1.134.073L13.5 10.5m2.25 0h-.008c-.386 0-.762.024-1.134.073L15 10.5m4.098 4.098a3.75 3.75 0 0 0 0-5.304l-6.402-6.402M19.902 4.098c.53-.53.53-1.38 0-1.91s-1.38-.53-1.91 0L15.75 4.5m2.25 0c.53.53.53 1.38 0 1.91s-1.38-.53-1.91 0L13.5 4.5m2.25 0a9.042 9.042 0 0 0-5.304-2.298c-.386.024-.762.073-1.134.073L10.5 4.5m2.25 0L10.5 2.25" />
  </svg>
);


export const ArrowLeftOnRectangleIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
  </svg>
);

export const MenuIcon: React.FC<SVGProps> = (props) => ( // Mobile menu toggle
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const CloseIcon: React.FC<SVGProps> = (props) => ( // Mobile close toggle
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export const ArrowDownTrayIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const PlayCircleIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113A.375.375 0 0 1 9.75 15.113V8.887a.375.375 0 0 1 .557-.328l5.603 3.113Z" />
  </svg>
);

export const LinkIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
);

export const MapPinIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

export const CreateNewMessageIcon: React.FC<SVGProps> = (props) => ( // Pencil in Square
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props} >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const VerticalEllipsisIcon: React.FC<SVGProps> = (props) => ( // More options in chat header
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props} className={`w-5 h-5 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
  </svg>
);

export const ThumbsUpIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V3a.75.75 0 0 1 .75-.75A2.25 2.25 0 0 1 16.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.59-9.579c.562-.354.833-.992.833-1.663V4.5M5.904 18.5c.381 0 .735-.056 1.05-.148L10.5 17.051c.654.213 1.356.317 2.069.317H17.25c.618 0 1.227-.24 1.605-.729C19.533 16.114 20.25 14.95 20.25 13.5c0-.435-.023-.863-.068-1.285a2.058 2.058 0 0 0-2.054-1.715H14.47M5.904 18.5H3.75c-.621 0-1.125-.504-1.125-1.125V11.25c0-.621.504-1.125 1.125-1.125h2.154M5.904 18.5v-1.874M6.633 10.25c.164 0 .334-.012.5-.036" />
  </svg>
);

export const PlusIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const AppLogoIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props} className={`w-7 h-7 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A11.978 11.978 0 0 1 12 16.5c-.993 0-1.953-.138-2.863-.388m0 0A8.992 8.992 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A11.978 11.978 0 0 0 12 7.5c.993 0 1.953.138 2.863.388" />
  </svg>
);

export const ChatBubbleOvalLeftEllipsisSolidIcon: React.FC<SVGProps> = (props) => ( // New Official Chat Icon
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.75 6.75 0 0 0 6.75-6.75v-1.5c0-2.084-1.174-3.932-2.916-4.952C8.407 7.754 7.375 7.248 6.205 7l-.172-.007A6.75 6.75 0 0 0 2.25 13.5v1.58c0 .898.153 1.764.442 2.564l2.112 3.999Z" clipRule="evenodd" />
    <path d="M17.084 7.582c.021.07.04.142.057.215A6.782 6.782 0 0 1 17.25 9v1.5a6.75 6.75 0 0 1-6.75 6.75h-2.59c-.431 0-.847-.07-1.244-.202a.75.75 0 0 0-.54.118l-1.637 1.228A.75.75 0 0 0 5.25 19.5V18c0-1.19.293-2.312.81-3.304A5.235 5.235 0 0 1 9 13.5H9.75c2.067 0 3.929.817 5.279 2.168 1.35 1.35 2.171 3.212 2.171 5.282v2.25a.75.75 0 0 0 1.28.53l2.112-4a6.708 6.708 0 0 0 .442-2.565V13.5a6.75 6.75 0 0 0-3.795-6.088Z" />
  </svg>
);

export const UsersGroupSolidIcon: React.FC<SVGProps> = (props) => ( // New Official People Icon
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 1-3.742 2.097c-.836.39-1.7.744-2.596.996V19.13Z" />
  </svg>
);

export const Cog8ToothSolidIcon: React.FC<SVGProps> = (props) => ( // New Official Settings Icon
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.947 1.52-.247.856-.644 1.634-1.195 2.285-.551.651-1.33 1.066-2.181 1.296A1.95 1.95 0 0 0 4.002 9.36c.118.66.304 1.28.56 1.858.256.577.583 1.118.978 1.604a.75.75 0 0 0 1.21-.287c.208-.405.36-.83.49-1.279.129-.448.213-.911.248-1.382a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75c.034.47.119.933.247 1.381.131.449.283.874.491 1.28.231.45.8.636 1.212.288.394-.486.721-1.027.976-1.604.257-.578.443-1.198.561-1.857a1.95 1.95 0 0 0-1.723-2.296c-.85-.23-1.63-.646-2.18-1.296-.552-.651-.949-1.429-1.196-2.285A1.95 1.95 0 0 0 11.078 2.25ZM12 15a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
    <path d="M4.759 12.094a3.752 3.752 0 0 1 .746-2.043 4.502 4.502 0 0 0-.3-.565c-.31-.53-.527-1.104-.638-1.715a.75.75 0 0 1 .313-.854c.99-.483 1.724-1.306 2.138-2.321a.75.75 0 0 1 .851-.313c.611.111 1.185.329 1.715.638a4.502 4.502 0 0 0 .565.3c.7-.246 1.388-.373 2.09-.373s1.39.127 2.09.372a4.502 4.502 0 0 0 .565-.3c.53-.31 1.104-.527 1.715-.638a.75.75 0 0 1 .854.313c.413 1.015 1.148 1.838 2.136 2.321a.75.75 0 0 1 .313.854c-.111.611-.329 1.185-.638-1.715a4.502 4.502 0 0 0-.3.565 3.752 3.752 0 0 1 .746 2.043c.077.619-.071 1.251-.354 1.797a4.502 4.502 0 0 0 .3.565c.31.53.527 1.104.638 1.715a.75.75 0 0 1-.313.854c-.99.483-1.724 1.306-2.138 2.321a.
75.75 0 0 1-.851.313c-.611-.111-1.185-.329-1.715-.638a4.502 4.502 0 0 0-.565-.3c-.7.246-1.388.373-2.09.373s-1.39-.127-2.09-.372a4.502 4.502 0 0 0-.565.3c-.53.31-1.104.527-1.715.638a.75.75 0 0 1-.854-.313c-.413-1.015-1.148-1.838-2.136-2.321a.75.75 0 0 1-.313-.854c.111-.611.329-1.185.638-1.715a4.502 4.502 0 0 0 .3-.565A3.752 3.752 0 0 1 4.759 12.094Z" />
  </svg>
);


export const TrashFilledIcon: React.FC<SVGProps> = (props) => ( // For Trash/Delete
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M16.5 4.125a3.375 3.375 0 0 0-3.375-3.375h-1.5a3.375 3.375 0 0 0-3.375 3.375V4.5h8.25v-.375ZM4.5 4.5a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15ZM5.25 7.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V8.25a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V8.25a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V8.25a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V8.25a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
  </svg>
);


export const ChatAltNotificationIcon: React.FC<SVGProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    <circle cx="18" cy="6" r="3" fill="currentColor" className="text-accent-DEFAULT" />
  </svg>
);

// --- Icons for Login Page ---
export const EyeIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const EyeSlashIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.388M16.358 16.858A9.873 9.873 0 0 1 12 18c-2.796 0-5.44-.934-7.172-2.574M12 15V9.705M15.019 15.019A3.375 3.375 0 0 1 12 15H9.705M15.019 15.019A3.375 3.375 0 0 0 15.019 15.019ZM12 12H8.25M12 12a2.25 2.25 0 0 1 2.25 2.25M12 12a2.25 2.25 0 0 0-2.25 2.25m0 0S9 12.75 9 12.75M12 12H3.75m9 9A9.826 9.826 0 0 1 12 21c-2.796 0-5.44-.934-7.172-2.574m0 0A10.477 10.477 0 0 1 1.934 12C3.226 7.662 7.244 4.5 12 4.5c.993 0 1.953.138 2.863.388m2.416 2.416A9.873 9.873 0 0 0 12 6c-2.796 0-5.44.934-7.172 2.574M12 3.295V3M12 3.295A2.25 2.25 0 0 1 12 3m0 .295V3m0 .295a2.25 2.25 0 0 0 0 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
  </svg>
);

export const UserPlusIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504-1.125-1.125 1.125h-17.25Z" />
  </svg>
);

export const CameraIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.04l-.821 1.316Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
  </svg>
);

// --- Icons for ViewProfileModal & AppSettingsPage ---
export const EnvelopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

export const ChatBubbleBottomCenterTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-3.861 8.25-8.625 8.25S3.75 16.556 3.75 12 7.611 3.75 12.375 3.75 21 7.444 21 12Zm-12.75 4.521V14.25M12 14.25v2.271" />
  </svg>
);

export const WifiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.176 11.926a9 9 0 0 1 13.648 0M2.065 8.815a12.75 12.75 0 0 1 19.87 0M12 18.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
  </svg>
);

export const WifiSlashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M8.288 15.038A5.25 5.25 0 0 1 12 13.5a5.25 5.25 0 0 1 3.712 1.538m-3.712-1.538a5.25 5.25 0 0 0-3.712 1.538m3.712-1.538v-1.31M5.176 11.926A9 9 0 0 1 12 9a9 9 0 0 1 6.824 2.926m-13.648 0A9 9 0 0 0 12 9a9 9 0 0 0 6.824-2.926m0 0a9.003 9.003 0 0 0-13.648 0M2.065 8.815a12.752 12.752 0 0 1 4.516-2.52M12 18.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
  </svg>
);


export const ShieldCheckIcon: React.FC<SVGProps> = (props) => ( // Used in InfoBar, general purpose
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

export const TrashCanSolidIcon: React.FC<SVGProps> = (props) => ( // For Delete actions
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75H4.5a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5H14A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.532.446 1.974 1.125A1.49 1.49 0 0 1 13.25 6H6.75c.41 0 .79-.168 1.076-.475A1.99 1.99 0 0 1 8 4h2Zm2.25 3.5a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0v-5Z" clipRule="evenodd" />
    <path d="M3.75 6A1.75 1.75 0 0 0 2 7.75v9.5A1.75 1.75 0 0 0 3.75 19h12.5A1.75 1.75 0 0 0 18 17.25v-9.5A1.75 1.75 0 0 0 16.25 6H3.75Z" />
  </svg>
);

export const ShieldExclamationIcon: React.FC<SVGProps> = (props) => ( // For Admin related warnings/actions
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
  </svg>
);

export const Cog6ToothFilledIcon: React.FC<SVGProps> = (props) => ( // General Settings (used by InfoBar)
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.947 1.52-.247.856-.644 1.634-1.195 2.285-.551.651-1.33 1.066-2.181 1.296A1.95 1.95 0 0 0 4.002 9.36c.118.66.304 1.28.56 1.858.256.577.583 1.118.978 1.604a.75.75 0 0 0 1.21-.287c.208-.405.36-.83.49-1.279.129-.448.213-.911.248-1.382a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75c.034.47.119.933.247 1.381.131.449.283.874.491 1.28.231.45.8.636 1.212.288.394-.486.721-1.027.976-1.604.257-.578.443-1.198.561-1.857a1.95 1.95 0 0 0-1.723-2.296c-.85-.23-1.63-.646-2.18-1.296-.552-.651-.949-1.429-1.196-2.285A1.95 1.95 0 0 0 11.078 2.25ZM12 15a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
    <path d="M4.759 12.094a3.752 3.752 0 0 1 .746-2.043 4.502 4.502 0 0 0-.3-.565c-.31-.53-.527-1.104-.638-1.715a.75.75 0 0 1 .313-.854c.99-.483 1.724-1.306 2.138-2.321a.75.75 0 0 1 .851-.313c.611.111 1.185.329 1.715.638a4.502 4.502 0 0 0 .565.3c.7-.246 1.388-.373 2.09-.373s1.39.127 2.09.372a4.502 4.502 0 0 0 .565-.3c.53-.31 1.104-.527 1.715-.638a.75.75 0 0 1 .854.313c.413 1.015 1.148 1.838 2.136 2.321a.75.75 0 0 1 .313.854c-.111.611-.329 1.185-.638-1.715a4.502 4.502 0 0 0-.3.565 3.752 3.752 0 0 1 .746 2.043c.077.619-.071 1.251-.354 1.797a4.502 4.502 0 0 0 .3.565c.31.53.527 1.104.638 1.715a.75.75 0 0 1-.313.854c-.99.483-1.724 1.306-2.138 2.321a.75.75 0 0 1-.851.313c-.611-.111-1.185-.329-1.715-.638a4.502 4.502 0 0 0-.565-.3c-.7.246-1.388.373-2.09.373s-1.39-.127-2.09-.372a4.502 4.502 0 0 0-.565.3c-.53.31-1.104.527-1.715-.638a.75.75 0 0 1-.854-.313c-.413-1.015-1.148-1.838-2.136-2.321a.75.75 0 0 1-.313-.854c.111-.611.329-1.185.638-1.715a4.502 4.502 0 0 0 .3-.565A3.752 3.752 0 0 1 4.759 12.094Z" />
  </svg>
);
// Note: The block of aliased exports that was previously at the end of this file has been removed.
// All icons are exported directly above by their defined names.
