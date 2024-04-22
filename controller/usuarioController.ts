import { Request, Response } from 'express';
import Usuario from '../models/usuario';

export const getUsuarios =  async(req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({usuarios});    
}

export const getUsuario = async(req: Request, res: Response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    
    if(usuario){
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        })
        
    }

   
}

//Crear usuario
export const postUsuario = async(req: Request, res: Response) => {
    const {body} = req;
   
    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email '+ body.email
            })
        }

        const usuario = await Usuario.create(body);       
        res.status(200).json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador del sistema'
        })
    }   
}

//Actualizar usuario
export const putUsuario = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;

    try {

        const isUsuario = await Usuario.findByPk(id);
        if(!isUsuario){
            return res.status(404).json({
                msg: 'No existe un usuario con el id '+ id
            })
        }  
        
        if(body.email != null && body.email != 'undefined'){   
            const existeEmail = await Usuario.findOne({
                where: {
                    email: body.email
                }
            });

            if(existeEmail){
                return res.status(400).json({
                    msg: 'Ya existe un usuario con el email '+ body.email
                })
            }
        }

        await Usuario.update(body, {where: {id: id}});       
        return res.status(200).json({
            msg: 'Usuario Actualizado'
        });

       

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador del sistema'
        })
    } 

    res.json({
        msg: 'putUsuario',
        body,
        id
    })    
}

//Eliminar usuario
export const deleteUsuario = async(req: Request, res: Response) => {
    const {id} = req.params;
   

    const isUsuario = await Usuario.findByPk(id);
    if(!isUsuario){
        return res.status(404).json({
            msg: 'No existe un usuario con el id '+ id
        })
    }  

    await Usuario.update({estado: false}, {where: {id: id}});       
        return res.status(200).json({
            msg: 'Usuario Eliminado'
        });
    
}