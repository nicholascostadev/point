const { withAxiom } = require("next-axiom");

/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
    images: {
        domains: ["uploadthing.com", "github.com"],
    },
});

module.exports = nextConfig;
