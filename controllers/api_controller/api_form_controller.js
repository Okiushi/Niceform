const Form = require('../../models/form_model');
const User = require('../../models/user_model');
require('dotenv').config();

const ADMIN_ID = process.env.ADMIN_ID; // récupération de l'ID de l'administrateur

const createForm = async (req, res) => {
    const form = new Form({
        name: req.body.name || 'Formulaire sans nom',
        public: true,
        sharelink: '',
        share_at: null,
        fields: req.body.fields,
        responses: req.body.responses,
        created_at: new Date()
    });

    try {
        const user = await User.findById(req.user._id);
        user.forms.push(form._id);
        await form.save();
        await user.save();
        res.status(201).send(form);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getForm = async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById(req.user._id);

    try {
        const form = await Form.findById(_id);
        if (!form) {
            return res.status(404).send();
        }

        // si l'utilisateur n'est pas le propriétaire du formulaire ou l'administrateur
        //if (!user.forms.includes(_id) || !user._id === ADMIN_ID) {
        //    form.sharelink = undefined;
        //    form.share_at = undefined;
        //    form.responses = undefined;
        //    form.created_at = undefined;
        //}
        
        // si le formulaire n'est pas public et que l'utilisateur n'est pas externe
        //if (form.public === false && user.external === false) {
        //    form.fields = undefined;
        //}
        
        res.send(form);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllForms = (req, res) => {
    Form.find().then((forms) => {
        
        forms.forEach(form => {
            form.sharelink = undefined;
            form.share_at = undefined;
            form.fields = undefined;
            form.responses = undefined;
            form.created_at = undefined;
            form.__v = undefined;
        })
        
        res.status(200).send(forms);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

const updateForm = async (req, res) => {
    
    const _id = req.params.id;
    const user = await User.findById(req.user._id);

    // Si l'utilisateur n'est pas le propriétaire du formulaire ou l'administrateur
    if (!(user.forms.includes(_id) || user._id === ADMIN_ID)) {
        return res.status(403).send('You are not allowed to update this form');
    }

    try {
        const form = await Form.findById(_id);

        if (!form) {
            return res.status(404).send();
        } else if (form.share_at !== null) { // Si le formulaire est partagé, on ne peut pas le modifier
            return res.status(403).send('This form is shared and cannot be updated');
        }
        // Mise à jour des champs du formulaire
        const updates = Object.keys(req.body);

        updates.forEach((update) => form.set(update, req.body[update]));

        await form.save();

        res.send(form);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteForm = async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById(req.user._id);

    // Si le formulaire n'existe pas
    if (!user.forms.includes(_id)) {
        return res.status(404).send();
    }
    
    // Si l'utilisateur n'est pas le propriétaire du formulaire ou l'administrateur
    if (!(user.forms.includes(_id) || user._id === ADMIN_ID)) {
        return res.status(403).send('You are not allowed to delete this form');
    }

    Form.findByIdAndDelete(_id).then(async (form) => {

        if (!form) {
            return res.status(404).send();
        }

        // Suppression du formulaire de la liste des formulaires de l'utilisateur et sauvegarde
        user.forms = user.forms.filter((formId) => formId.toString() !== _id.toString());
        await user.save();

        res.send(form);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

const shareForm = async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById(req.user._id);
    
    // Si l'utilisateur n'est pas le propriétaire du formulaire ou l'administrateur
    if (!(user.forms.includes(_id) || user._id === ADMIN_ID)) {
        return res.status(403).send('You are not allowed to share this form');
    }
    
    try {
        const form = await Form.findById(_id);
        
        if (!form) {
            return res.status(404).send();
        }
        
        form.sharelink = _id;
        form.share_at = new Date();
        
        await form.save();
        
        res.send(form);
    } catch (error) {
        res.status(400).send(error);
    }
}

const addResponse = async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById(req.user._id);
    
    try {
        const form = await Form.findById(_id);
        
        if (!form) {
            return res.status(404).send();
        }
        
        for (let [key, value] of Object.entries(req.body)) {
            form.responses.push({
                user_id: value.user_id,
                form_data: value.form_data,
                field_id: value.field_id,
                created_at: value.created_at
            });
        }
        
        await form.save();
        
        res.send(form);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {createForm, getForm, getAllForms, updateForm, deleteForm, shareForm, addResponse};
