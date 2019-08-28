import User from '../models/User';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().required().email(),
            password: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }

        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(400).json({ error: 'User not exists' });
        }

        if (!user.checkPassword(req.body.password)) {
            return res.status(400).json({ error: 'User not exists' });
        }

        const { id, name, email } = user;

        // CRIANDO TOKEN
        const token = jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.expires });

        res.json({
            user: { id, name, email },
            token
        });
    }
}

export default new SessionController();