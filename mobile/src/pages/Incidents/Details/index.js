import React from 'react';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

import logoIMG from '../../../assets/logo.png';

export default function IncidentDetails() {
    
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const message = `Olá ${incident.name}! Gostaria de ser o Herói do caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}.`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail(incident) {
        MailComposer.composeAsync({
            subject: `Quero ser seu Herói no caso ${incident.title}.`,
            recipients: [ incident.email ],
            body: message,
        })
    }

    function sendWhatsApp(incident) {
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoIMG}></Image>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041"></Feather>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={styles.incidentProperty, { marginTop: 0 }}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} / {incident.city} - {incident.uf}</Text>
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>
                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>            
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>            
                <Text style={styles.heroDescription}>Entre em contato:</Text>            
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={() => sendWhatsApp(incident)}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => sendMail(incident)}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}