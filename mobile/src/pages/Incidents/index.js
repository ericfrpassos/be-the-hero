import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import logoIMG from '../../assets/logo.png';

import styles from './styles';

import api from '../../services/api';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [totalIncidents, setTotalIncidents] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    async function load() {

        if(loading) return;
        if(totalIncidents > 0 && incidents.length == totalIncidents) return;

        setLoading(true);

        const response = await api.get('incidents', { 
            params: { page } 
        });
        
        setIncidents([...incidents, ...response.data]);
        setTotalIncidents(response.headers['x-total-records']);        
        setPage(page + 1);

        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    function navigateToIncidentDatail(incident) {
        navigation.navigate('IncidentDetails', { incident });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoIMG} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{totalIncidents} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
        
            <FlatList
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                style={styles.incidentList}
                showsVerticalScrollIndicator={false}
                onEndReached={load}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.description}</Text>
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton}
                            onPress={() => navigateToIncidentDatail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}
