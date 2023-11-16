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

    useEffect(() => {
        getNewsFeed()
    }, [])

    const getNewsFeed = async () => {
        let data = await VelocidaApi.getNews()
        let parser = new XMLParser();
        let stories = await parser.parse(data)
        console.log(stories.rss.channel.item)
        setNewsFeed(stories.rss.channel.item)
    }

    if (!newsFeed) return <LoadingSpinner />;

    return (
        <Container>
            <Row className="flex">
                {newsFeed.length
                    ? (
                        <>
                            {newsFeed.map(n => (
                                <Card style={{ width: "15rem", margin: "2rem" }}>
                                    <Card.Body>
                                        <Card.Img style={{ height: "200px", objectFit: "none" }} variant="top" src={n.image} />
                                        <Card.Title>{n.title}</Card.Title>
                                        <Button style={{ background: ""}}variant="success">Read News Story</Button>
                                    </Card.Body>
                                </Card>
                            ))
                            }
                        </>
                    ) : (
                        <p className="alert alert-info">Sorry, no news stories were found! Check back later... </p>
                    )}
            </Row>
        </Container>

    )
}

export default News