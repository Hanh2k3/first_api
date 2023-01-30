const index = (req, res) => {
    return res.json({
        message: 'Router success'
    })
}

module.exports = {
    index
}