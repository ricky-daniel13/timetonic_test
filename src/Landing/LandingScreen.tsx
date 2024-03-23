import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Modal, ScrollView, ViewStyle } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator, Portal, Dialog, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { AuthContext } from '../Contexts/AuthContext';
import { BookDisplay, GetBooks } from '../API/Timetonic';


function LandingScreen(): React.JSX.Element {
    const cardInit: BookDisplay[] = [
    ];
    //Get Userstate context;
    const UserState = useContext(AuthContext);

    const [cardData, setCardData] = useState(cardInit);


    useEffect(() => {
        // This runs only on mount (when the component appears)
        GetBooks(UserState!).then((books) => {
            if(books!=null)
                setCardData(books);
        });
      }, []);


    return (
        
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}>
            {cardData.map((card, index) => (
                <BookCard key={index} title={card.bookName} imageurl={card.bookImg} style={styles.card} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 4
    },
    content: {
        padding: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        margin: 2,
        marginTop: 6,
        width: '45%'
    },
    bookImage: {
        height: 100,
    },
});


type BookCardProps = {
    title: string;
    imageurl: string;
    style: ViewStyle;
};
export const BookCard = ({ title, imageurl, style }: BookCardProps) => {
    return (
        <Card style={style} elevation={5}>
            <Card.Cover source={{ uri: imageurl }} style={styles.bookImage}/>
            <Card.Title
                title={title}/>
        </Card>
    );
};

export default LandingScreen;