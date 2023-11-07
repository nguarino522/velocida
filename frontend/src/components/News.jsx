import axios from "axios"
import Parser from "rss-parser"
import React, { useState, useEffect } from "react"

const News = () => {
    const [newsFeed, setNewsFeed] = useState([])

    useEffect(() => {
        getNewsFeed()
    }, [])

    const getNewsFeed = async () => {
        //const url = "https://worldathletics.org/news/rss"
        //const parser = new Parser()
        //let stories = await axios.get("https://www.letsrun.com/feed/")
        //let feed = await parser.parseURL("https://www.letsrun.com/feed/")
        //let cards = await axios.get("https://www.dirtyoldsneakers.com/feed/")
        //let parser = new Parser();
        //let stories = await parser.parseURL("https://worldathletics.org/news/rss")
        //console.log(stories)
    }

    return (
        <div>TEMP HOLDING ELEMENT</div>
    )
}

export default News