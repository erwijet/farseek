// Ora spinner for dots doesn't work on windows, so here we override the animation 

module.exports = require('ora')({
    "spinner": {
        "interval": 80,
        "frames": [
            "⠋",
            "⠙",
            "⠹",
            "⠸",
            "⠼",
            "⠴",
            "⠦",
            "⠧",
            "⠇",
            "⠏"
        ]
    }
});
