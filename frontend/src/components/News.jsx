import axios from "axios"
import Parser from "rss-parser"
import React, { useState, useEffect } from "react"
import VelocidaApi from "../VelocidaApi"
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import LoadingSpinner from "./LoadingSpinner";
import Row from 'react-bootstrap/Row';

const News = () => {
    const [newsFeed, setNewsFeed] = useState([])
    const [newsLoaded, setNewsLoaded] = useState(false);

    useEffect(() => {
        setNewsLoaded(false)
        getNewsFeed()
    }, [])

    const getNewsFeed = async () => {
        let data = await VelocidaApi.getNews()
        let parser = new XMLParser();
        let stories = await parser.parse(data)
        setNewsFeed(stories.rss.channel.item)
        setNewsLoaded(true)
    }

    if (!newsLoaded) return <LoadingSpinner />;

    return (
        <>  
            <h1>Latest News Stories From World Athletics:</h1>
            <Container className="fading-in">
                <Row className="flex">
                    {newsFeed.length
                        ? (
                            <>
                                {newsFeed.map(n => (
                                    <div className="card card-custom" style={{ width: "14rem", margin: "1rem" }} key={n.guid}>
                                        <a href={n.link} target="_blank" style={{ width: "100%", height: "100%" }}>
                                            <img src={n.image} className="card-img-top"></img>
                                            <div className="card-body">
                                                <p className="card-text" style={{color: "#72A276"}}>{n.title}</p>
                                            </div>
                                        </a>
                                    </div>
                                ))
                                }
                            </>
                        ) : (
                            <p className="alert alert-info">Sorry, no news stories were found! Check back later... </p>
                        )}
                </Row>
            </Container>
        </>
    )
}

export default News