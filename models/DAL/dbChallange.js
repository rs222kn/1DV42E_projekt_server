'use strict';

const Challange = require('./schemas/challange.js');
const co = require('co');

/**
 * [makes new challange mongoose object]
 * @param  {[mongoose user Object]} challanger     [description]
 * @param  {[mongoose card Object]} challangerCard [description]
 * @param  {[mongoose user Object]} opponent       [description]
 * @param  {[mongoose card Object]} opponentCard   [description]
 * @return {[object]}                [result of new]
 */
const newChallange = (challanger, challangerCard, opponent, opponentCard) =>
    new Challange({
        challanger,
        challangerCard,
        opponent,
        opponentCard
    });

/**
 * [retrives callange object from id]
 * @param  {[string]} id [id of object]
 * @return {[prmise]}    [resolves to object of a challange]
 */
const getChallangeById = (id) =>
    Challange.findOne({ _id: id })
        .populate('challangerCard')
        .populate('challanger')
        .populate('opponent')
        .populate('opponentCard')
        .populate('challangerRounds')
        .populate('opponentRounds')
        .exec();

const getChallangeByIdNoPopulate = (id) =>
    Challange.findOne({ _id: id })
        .exec();

/**
 * [retrives callange object from id, lean from]
 * @param  {[string]} id [id of object]
 * @return {[prmise]}    [resolves to object of a challange]
 */
const getChallangeByIdLean = (id) =>
    Challange.findOne({ _id: id })
        .populate('challangerCard')
        .populate('challanger')
        .populate('opponent')
        .populate('opponentCard')
        .lean()
        .exec();

const updateChallangeProps = (id, props) =>
    Challange.update({ _id: id }, {
        'challangerProps.healCards': Number(props.cHealCards),
        'challangerProps.attackCards': Number(props.cAttackCards),
        'challangerProps.blockCards': Number(props.cBlockCards),
        'challangerProps.maxLife': Number(props.cMaxLife),
        'challangerProps.life': Number(props.cLife),

        'opponentProps.healCards': Number(props.oHealCards),
        'opponentProps.attackCards': Number(props.oAttackCards),
        'opponentProps.blockCards': Number(props.oBlockCards),
        'opponentProps.maxLife': Number(props.oMaxLife),
        'opponentProps.life': Number(props.oLife)})
        .exec();

const getAllChallanges = () => Challange.find({});

const getCardsInChallange = (id) => Challange.findOne({_id: id}, 'challangerCard opponentCard');

module.exports = {
    newChallange,
    getChallangeById,
    getChallangeByIdLean,
    getChallangeByIdNoPopulate,
    getAllChallanges,
    updateChallangeProps,
    getCardsInChallange
};
