import { ElementCompact } from 'xml-js'

import { TAGS } from './constants'
import { ISOXMLManager } from '../ISOXMLManager'
import { registerEntityClass } from '../classRegistry'
import { fromXML, toXML } from '../utils'

import { Entity, EntityConstructor, AttributesDescription } from '../types'

export enum PointPointTypeEnum {
    Flag = '1',
    Other = '2',
    FieldAccess = '3',
    Storage = '4',
    Obstacle = '5',
    GuidanceReferenceA = '6',
    GuidanceReferenceB = '7',
    GuidanceReferenceCenter = '8',
    GuidancePoint = '9',
    PartfieldReferencePoint = '10',
    Homebase = '11',
}

export type PointAttributes = {
    PointType: PointPointTypeEnum
    PointDesignator?: string
    PointNorth: number
    PointEast: number
    PointUp?: number
    PointColour?: number
    PointHorizontalAccuracy?: number
    PointVerticalAccuracy?: number
    Filename?: string
    Filelength?: number
    ProprietaryAttributes?: {[name: string]: string}
    ProprietaryTags?: {[tag: string]: ElementCompact[]}
}

const ATTRIBUTES: AttributesDescription = {
    A: {
        name: 'PointType',
        type: 'xs:NMTOKEN',
        isPrimaryId: false,
        isOptional: false,
        isOnlyV4: false,
    },
    B: {
        name: 'PointDesignator',
        type: 'xs:string',
        isPrimaryId: false,
        isOptional: true,
        isOnlyV4: false,
    },
    C: {
        name: 'PointNorth',
        type: 'xs:decimal',
        isPrimaryId: false,
        isOptional: false,
        isOnlyV4: false,
        minValue: -90,
        maxValue: 90,
        fractionDigits: 9,
    },
    D: {
        name: 'PointEast',
        type: 'xs:decimal',
        isPrimaryId: false,
        isOptional: false,
        isOnlyV4: false,
        minValue: -180,
        maxValue: 180,
        fractionDigits: 9,
    },
    E: {
        name: 'PointUp',
        type: 'xs:long',
        isPrimaryId: false,
        isOptional: true,
        isOnlyV4: false,
        minValue: -2147483647,
        maxValue: 2147483647,
    },
    F: {
        name: 'PointColour',
        type: 'xs:unsignedByte',
        isPrimaryId: false,
        isOptional: true,
        isOnlyV4: false,
        minValue: 0,
        maxValue: 254,
    },
    G: {
        name: 'PointId',
        type: 'xs:ID',
        isPrimaryId: true,
        isOptional: true,
        isOnlyV4: true,
    },
    H: {
        name: 'PointHorizontalAccuracy',
        type: 'xs:decimal',
        isPrimaryId: false,
        isOptional: true,
        isOnlyV4: true,
        minValue: 0,
        maxValue: 65,
    },
    I: {
        name: 'PointVerticalAccuracy',
        type: 'xs:decimal',
        isPrimaryId: false,
        isOptional: true,
        isOnlyV4: true,
        minValue: 0,
        maxValue: 65,
    },
    J: {
        name: 'Filename',
        type: 'xs:string',
        isPrimaryId: false,
        isOptional: true,
        isOnlyV4: true,
    },
    K: {
        name: 'Filelength',
        type: 'xs:unsignedLong',
        isPrimaryId: false,
        isOptional: true,
        isOnlyV4: true,
        minValue: 0,
        maxValue: 4294967294,
    },
}
const CHILD_TAGS = {
}

export class Point implements Entity {
    public tag = TAGS.Point

    constructor(public attributes: PointAttributes, public isoxmlManager: ISOXMLManager) {
    }

    static fromXML(xml: ElementCompact, isoxmlManager: ISOXMLManager, internalId?: string, targetClass: EntityConstructor = Point): Promise<Entity> {
        return fromXML(xml, isoxmlManager, targetClass, ATTRIBUTES, CHILD_TAGS, internalId)
    }

    toXML(): ElementCompact {
        return toXML(this, ATTRIBUTES, CHILD_TAGS)
    }
}

registerEntityClass(TAGS.Point, Point)