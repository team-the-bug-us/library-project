const defaultImages = [
    `https://res.cloudinary.com/dingakmfw/image/upload/v1675797561/bug-us/default-profile-image-2_mdser7.jpg`,
    `https://res.cloudinary.com/dingakmfw/image/upload/v1675797561/bug-us/default-profile-image-3_sxztmo.jpg`,
    `https://res.cloudinary.com/dingakmfw/image/upload/v1675797561/bug-us/default-profile-image-1_ilynq8.jpg`,
    `https://res.cloudinary.com/dingakmfw/image/upload/v1675797560/bug-us/default-profile-image-6_uxsnu4.jpg`,
    `https://res.cloudinary.com/dingakmfw/image/upload/v1675797560/bug-us/default-profile-image-9_h8ccpl.jpg`,
    `https://res.cloudinary.com/dingakmfw/image/upload/v1675797560/bug-us/default-profile-image-7_mej5gi.jpg`,
    `https://res.cloudinary.com/dingakmfw/image/upload/v1675797560/bug-us/default-profile-image-4_haehng.jpg`,
    `https://res.cloudinary.com/dingakmfw/image/upload/v1675797560/bug-us/default-profile-image-8_nxoszf.jpg`,
    `https://res.cloudinary.com/dingakmfw/image/upload/v1675797560/bug-us/default-profile-image-5_kysn16.jpg`,
]


module.exports = ()=>{
    const randomIndex = Math.floor(Math.random() * 9)
    return defaultImages[randomIndex]
}