import { ElementCompact } from 'xml-js'

import { TAGS } from './constants'
import { ISOXMLManager } from '../ISOXMLManager'
import { registerEntityClass } from '../classRegistry'
import { fromXML, toXML } from '../utils'

import { Entity, EntityConstructor, AttributesDescription, ISOXMLReference } from '../types'

export type ProcessDataVariableAttributes = {
    ProcessDataDDI: string
    ProcessDataValue: number
    ProductIdRef?: ISOXMLReference
    DeviceElementIdRef?: ISOXMLReference
    ValuePresentationIdRef?: ISOXMLReference
    ActualCulturalPracticeValue?: number
    ElementTypeInstanceValue?: number
    ProcessDataVariable?: ProcessDataVariable[]
}

const ATTRIBUTES: AttributesDescription = {
    A: { name: 'ProcessDataDDI', type: 'xs:hexBinary', isPrimaryId: false },
    B: { name: 'ProcessDataValue', type: 'xs:long', isPrimaryId: false },
    C: { name: 'ProductIdRef', type: 'xs:IDREF', isPrimaryId: false },
    D: { name: 'DeviceElementIdRef', type: 'xs:IDREF', isPrimaryId: false },
    E: { name: 'ValuePresentationIdRef', type: 'xs:IDREF', isPrimaryId: false },
    F: { name: 'ActualCulturalPracticeValue', type: 'xs:long', isPrimaryId: false },
    G: { name: 'ElementTypeInstanceValue', type: 'xs:long', isPrimaryId: false },
}
const CHILD_TAGS = {
    PDV: { name: 'ProcessDataVariable' },
}

export class ProcessDataVariable implements Entity {
    public tag = TAGS.ProcessDataVariable

    constructor(public attributes: ProcessDataVariableAttributes, public isoxmlManager: ISOXMLManager) {
    }

    static fromXML(xml: ElementCompact, isoxmlManager: ISOXMLManager, targetClass: EntityConstructor = ProcessDataVariable): Entity {
        return fromXML(xml, isoxmlManager, targetClass, ATTRIBUTES, CHILD_TAGS)
    }

    toXML(): ElementCompact {
        return toXML(this, ATTRIBUTES, CHILD_TAGS)
    }
}

registerEntityClass(TAGS.ProcessDataVariable, ProcessDataVariable)