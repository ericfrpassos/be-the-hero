const connection = require('../database/connection')

module.exports = {
    
    async index (request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf']);

        response.header('X-Total-Records', count['count(*)']);
        return response.json(incidents);
    },

    async store (request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
            
        return response.json({id});
    },

    async delete (request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where({
                id: id
              , ong_id: ong_id})
            .select('*')
            .first().delete();

        if (!incident) {
            response.status(401).json({ error: 'Operation not permitted.' });
        }

        return response.status(204).send();
    }
};