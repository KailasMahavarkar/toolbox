
const childrenSupport = ({ addVariant }) => {
    addVariant("child", "& > *");
    addVariant("child-hover", "& > *:hover");
};


module.exports = {
    content: ['./src/**/*.{vue,js,ts}'],
    plugins: [require('@tailwindcss/typography'), require('daisyui'), childrenSupport],
};
