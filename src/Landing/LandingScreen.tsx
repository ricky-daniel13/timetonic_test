import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Modal, ScrollView, ViewStyle } from 'react-native';
import { ActivityIndicator, Appbar, List, Surface } from 'react-native-paper';
import { AuthContext } from '../Contexts/AuthContext';
import { BookDisplay, GetBooks } from '../API/Timetonic';


function LandingScreen(): React.JSX.Element {
    const cardInit: BookDisplay[] = [
    ];
    //Get Userstate context;
    const UserState = useContext(AuthContext);

    const [cardData, setCardData] = useState(cardInit);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Getbooks on mount
        GetBooks(UserState!).then((books) => {
            if (books != null)
                setCardData(books);
            setIsLoading(false);
        });
    }, []);


    return (
        <View>
            <Modal
                transparent={true}
                animationType="fade"
                visible={isLoading}>
                <View style={styles.overlayBg}>
                    <ActivityIndicator animating={isLoading} />
                </View>
            </Modal>
            <Appbar.Header>
                <Appbar.Content title="Books" />
            </Appbar.Header>
            <ScrollView style={styles.container}
                contentContainerStyle={styles.content}>
                {cardData.map((card, index) => (
                    <BookCard key={index} title={card.bookName} imageurl={card.bookImg} style={styles.card} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
    },
    overlayBg: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        paddingBottom: 100,
    },
    card: {
        marginTop: 5,
        padding: 0,
    },
    cardImage:{
        padding: 0,
        margin:0,
        height:500
    }
});


type BookCardProps = {
    title: string;
    imageurl: string;
    style: ViewStyle;
};
export const BookCard = ({ title, imageurl, style }: BookCardProps) => {
    return (
        <Surface elevation={5} style={styles.card}>
            <List.Item title={title}
                left={(props) => (
                    <List.Image
                        style={{...props.style, ...styles.cardImage}}
                        source={{ uri: imageurl }}
                    />
                )}
            />
        </Surface>
    );
};

export default LandingScreen;