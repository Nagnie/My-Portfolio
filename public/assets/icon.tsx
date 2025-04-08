import * as React from "react"
const SvgComponent = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 2"
        viewBox="0 0 111 111"
        className="animate-spin"
        style={{
            animationDuration: "3s",
            fill: "#333"
        }}
        {...props}
    >
        <path
            d="M73.08 54.2c-4.77-.71-7.15-6.25-4.3-10.14.65-.88 1.11-1.37 1.11-1.37l14.28-14.28-1.59-1.59L68.3 41.1s-.45.42-1.25 1.02c-3.95 2.94-9.68.56-10.25-4.33-.12-1.02-.18-2.09-.18-3.24V0h-2.25v34.56c0 1.13-.06 2.19-.18 3.19-.57 4.95-6.43 7.38-10.33 4.28-.79-.63-1.58-1.33-2.38-2.13L28.4 26.82l-1.59 1.59 13.08 13.08c.81.81 1.53 1.62 2.16 2.42 3.06 3.86.69 9.59-4.19 10.31-1 .15-1.61.16-1.61.16H0v2.25h36.26s.63.02 1.66.17c4.77.71 7.15 6.25 4.3 10.14-.65.88-1.11 1.37-1.11 1.37L26.83 82.59l1.59 1.59L42.7 69.9s.44-.42 1.25-1.02c3.95-2.94 9.68-.56 10.25 4.33.12 1.02.18 2.09.18 3.24v34.56h2.25V76.45c0-1.13.06-2.19.18-3.19.57-4.95 6.43-7.38 10.33-4.28.79.63 1.58 1.34 2.38 2.13L82.6 84.19l1.59-1.59-13.08-13.08a27.48 27.48 0 0 1-2.16-2.42c-3.06-3.86-.69-9.59 4.19-10.31 1-.15 1.61-.16 1.61-.16h36.26v-2.25H74.75s-.63-.02-1.66-.17Z"
            data-name="Layer 1"
            style={{
                fill: "var(--foreground)",
                strokeWidth: 0,
            }}
        />
    </svg>
)
export default SvgComponent