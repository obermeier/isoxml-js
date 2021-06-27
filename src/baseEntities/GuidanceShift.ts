import { ElementCompact } from 'xml-js'

import { TAGS } from './constants'
import { ISOXMLManager } from '../ISOXMLManager'
import { registerEntityClass } from '../classRegistry'
import { fromXML, toXML } from '../utils'
import { AllocationStamp } from './AllocationStamp'

import { Entity, EntityConstructor, AttributesDescription, ISOXMLReference } from '../types'

export type GuidanceShiftAttributes = {
    GuidanceGroupIdRef?: ISOXMLReference
    GuidancePatternIdRef?: ISOXMLReference
    GuidanceEastShift?: number
    GuidanceNorthShift?: number
    PropagationOffset?: number
    AllocationStamp?: AllocationStamp[]
}

const ATTRIBUTES: AttributesDescription = {
    A: { name: 'GuidanceGroupIdRef', type: 'xs:IDREF', isPrimaryId: false },
    B: { name: 'GuidancePatternIdRef', type: 'xs:IDREF', isPrimaryId: false },
    C: { name: 'GuidanceEastShift', type: 'xs:long', isPrimaryId: false },
    D: { name: 'GuidanceNorthShift', type: 'xs:long', isPrimaryId: false },
    E: { name: 'PropagationOffset', type: 'xs:long', isPrimaryId: false },
}
const CHILD_TAGS = {
    ASP: { name: 'AllocationStamp' },
}

export class GuidanceShift implements Entity {
    public tag = TAGS.GuidanceShift

    constructor(public attributes: GuidanceShiftAttributes, public isoxmlManager: ISOXMLManager) {
    }

    static fromXML(xml: ElementCompact, isoxmlManager: ISOXMLManager, targetClass: EntityConstructor = GuidanceShift): Entity {
        return fromXML(xml, isoxmlManager, targetClass, ATTRIBUTES, CHILD_TAGS)
    }

    toXML(): ElementCompact {
        return toXML(this, ATTRIBUTES, CHILD_TAGS)
    }
}

registerEntityClass(TAGS.GuidanceShift, GuidanceShift)