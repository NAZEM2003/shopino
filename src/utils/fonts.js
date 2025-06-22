import { Caveat , Roboto} from "next/font/google";


export const caveat = Caveat({
    subsets: ["latin"],
    style: "normal",
    display: "swap",
    weight: ['400', '500', '600', '700'],
});

export const roboto = Roboto({
    subsets: ["latin"],
    style: "normal",
    display: "swap",
    weight: ['400', '500'],
})