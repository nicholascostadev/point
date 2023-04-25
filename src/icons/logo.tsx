"use client";

import { useTheme } from "next-themes";

interface ILogoProps extends React.SVGProps<SVGSVGElement> {}

export function Logo(props: ILogoProps) {
    const { theme, setTheme } = useTheme();

    const color = theme === "dark" ? "#e5e7eb" : "#030712";

    return (
        <svg
            width="102"
            height="66"
            viewBox="0 0 102 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g filter="url(#filter0_d_13_194)">
                <path
                    d="M41 29.3086V56C9.6381 35.7577 27.9325 11.5657 41 2V29.3086ZM41 29.3086C41 29.3086 23.7819 29.3086 4 29.3086"
                    strokeWidth="2"
                    shapeRendering="crispEdges"
                    stroke={color}
                />
            </g>
            <g filter="url(#filter1_d_13_194)">
                <path
                    d="M40.3989 37V20.2H47.2389C48.1509 20.2 48.9749 20.432 49.7109 20.896C50.4629 21.344 51.0629 21.96 51.5109 22.744C51.9589 23.528 52.1829 24.4 52.1829 25.36C52.1829 26.32 51.9589 27.192 51.5109 27.976C51.0629 28.76 50.4629 29.392 49.7109 29.872C48.9749 30.336 48.1509 30.568 47.2389 30.568H42.9909V37H40.3989ZM42.9909 28.072H47.1909C47.6229 28.072 48.0149 27.952 48.3669 27.712C48.7189 27.456 48.9989 27.128 49.2069 26.728C49.4309 26.312 49.5429 25.856 49.5429 25.36C49.5429 24.864 49.4309 24.416 49.2069 24.016C48.9989 23.616 48.7189 23.296 48.3669 23.056C48.0149 22.816 47.6229 22.696 47.1909 22.696H42.9909V28.072ZM60.4154 37.24C59.1834 37.24 58.0794 36.96 57.1034 36.4C56.1434 35.824 55.3834 35.048 54.8234 34.072C54.2634 33.08 53.9834 31.952 53.9834 30.688C53.9834 29.424 54.2634 28.304 54.8234 27.328C55.3834 26.336 56.1434 25.56 57.1034 25C58.0794 24.424 59.1834 24.136 60.4154 24.136C61.6314 24.136 62.7194 24.424 63.6794 25C64.6554 25.56 65.4234 26.336 65.9834 27.328C66.5434 28.304 66.8234 29.424 66.8234 30.688C66.8234 31.952 66.5434 33.08 65.9834 34.072C65.4234 35.048 64.6554 35.824 63.6794 36.4C62.7194 36.96 61.6314 37.24 60.4154 37.24ZM60.4154 34.984C61.1674 34.984 61.8394 34.8 62.4314 34.432C63.0234 34.048 63.4874 33.536 63.8234 32.896C64.1594 32.24 64.3194 31.504 64.3034 30.688C64.3194 29.856 64.1594 29.12 63.8234 28.48C63.4874 27.824 63.0234 27.312 62.4314 26.944C61.8394 26.576 61.1674 26.392 60.4154 26.392C59.6634 26.392 58.9834 26.584 58.3754 26.968C57.7834 27.336 57.3194 27.848 56.9834 28.504C56.6474 29.144 56.4874 29.872 56.5034 30.688C56.4874 31.504 56.6474 32.24 56.9834 32.896C57.3194 33.536 57.7834 34.048 58.3754 34.432C58.9834 34.8 59.6634 34.984 60.4154 34.984ZM69.9251 37V24.4H72.3971V37H69.9251ZM71.1251 21.616C70.5971 21.616 70.1891 21.48 69.9011 21.208C69.6131 20.936 69.4691 20.552 69.4691 20.056C69.4691 19.592 69.6131 19.216 69.9011 18.928C70.2051 18.64 70.6131 18.496 71.1251 18.496C71.6531 18.496 72.0611 18.632 72.3491 18.904C72.6371 19.176 72.7811 19.56 72.7811 20.056C72.7811 20.52 72.6291 20.896 72.3251 21.184C72.0371 21.472 71.6371 21.616 71.1251 21.616ZM76.1968 37V24.4H78.6688V26.992L78.2368 27.28C78.3968 26.72 78.7088 26.208 79.1728 25.744C79.6368 25.264 80.1888 24.88 80.8288 24.592C81.4688 24.288 82.1248 24.136 82.7968 24.136C83.7568 24.136 84.5568 24.328 85.1968 24.712C85.8368 25.08 86.3168 25.648 86.6368 26.416C86.9568 27.184 87.1168 28.152 87.1168 29.32V37H84.6448V29.488C84.6448 28.768 84.5488 28.176 84.3568 27.712C84.1648 27.232 83.8688 26.888 83.4688 26.68C83.0688 26.456 82.5728 26.36 81.9808 26.392C81.5008 26.392 81.0608 26.472 80.6608 26.632C80.2608 26.776 79.9088 26.984 79.6048 27.256C79.3168 27.528 79.0848 27.848 78.9088 28.216C78.7488 28.568 78.6688 28.952 78.6688 29.368V37H77.4448C77.2368 37 77.0288 37 76.8208 37C76.6128 37 76.4048 37 76.1968 37ZM92.0302 37V21.184H94.5022V37H92.0302ZM89.4142 26.8V24.4H97.4302V26.8H89.4142Z"
                    fill={color}
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_13_194"
                    x="0"
                    y="0.0286865"
                    width="46"
                    height="65.807"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_13_194"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_13_194"
                        result="shape"
                    />
                </filter>
                <filter
                    id="filter1_d_13_194"
                    x="36.3989"
                    y="18.496"
                    width="65.0313"
                    height="26.744"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_13_194"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_13_194"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
}
