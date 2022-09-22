import { gql } from '@apollo/client'

export const WHO_AM_I = gql`
  {
    myAgent {
      id
      name
    }
  }
`

export const LIST_ECONOMIC_EVENTS = gql`
  query ListEconomicEvents {
    economicEvents {
      edges {
        node {
          id
          note
          hasBeginning
          hasEnd
          # process is functioning as category
          inputOf {
            id
            name
            note
          }
        }
      }
    }
  }
`

export const LIST_COMMITMENTS = gql`
  query ListCommitment {
    commitments {
      edges {
        node {
          id
          revisionId
          note
          hasBeginning
          inputOf {
            id
            name
            note
          }
        }
      }
    }
  }
`

export const LIST_ECONOMIC_RESOURCES = gql`
  query ListEconomicResources {
    economicResources {
      edges {
        node {
          id
          primaryAccountable {
            id
            name
          }
          accountingQuantity {
            hasNumericalValue
            hasUnit {
              id
              label
              symbol
            }
          }
          onhandQuantity {
            hasNumericalValue
            hasUnit {
              label
              symbol
            }
          }
          image
          name
        }
      }
    }
  }
`

export const LIST_AGENTS = gql`
  query ListAgents {
    agents {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

export const LIST_UNITS = gql`
  query ListUnits {
    units {
      edges {
        node {
          id
          label
          symbol
        }
      }
    }
  }
`

export const LIST_PROCESSES = gql`
  query ListProcesses {
    processes {
      edges {
        node {
          id
          name
          note
          observedInputs {
            id
          }
          classifiedAs
        }
      }
    }
  }
`

export const LIST_PROCESSES_WITHOUT_LINKS = gql`
  query ListProcessesWithoutLinks {
    processes {
      edges {
        node {
          id
          name
          note
          classifiedAs
        }
      }
    }
  }
`

export const CREATE_ECONOMIC_EVENT = gql`
  mutation CreateEconomicResource($event: EconomicEventCreateParams!) {
    createEconomicEvent(event: $event) {
      economicEvent {
        id
      }
    }
  }
`

export const CREATE_COMMITMENT = gql`
  mutation CreateCommitment($commitment: CommitmentCreateParams!) {
    createCommitment(commitment: $commitment) {
      commitment {
        id
        revisionId
        hasBeginning
      }
    }
  }
`

export const DELETE_COMMITMENT = gql`
  mutation DeleteCommitment($revisionId: ID!) {
    deleteCommitment(revisionId: $revisionId)
  }
`

export const UPDATE_ECONOMIC_RESOURCES = gql`
  mutation CreateEconomicResource($event: EconomicEventCreateParams!) {
    createEconomicEvent(event: $event) {
      economicEvent {
        resourceInventoriedAs {
          id
          accountingQuantity {
            hasNumericalValue
            hasUnit {
              id
            }
          }
        }
      }
    }
  }
`

export const CREATE_ECONOMIC_RESOURCES = gql`
  mutation CreateEconomicResource(
    $event: EconomicEventCreateParams!
    $newInventoriedResource: EconomicResourceCreateParams!
  ) {
    createEconomicEvent(
      event: $event
      newInventoriedResource: $newInventoriedResource
    ) {
      economicResource {
        id
        accountingQuantity
      }
    }
  }
`

export const CREATE_RESOURCE_SPECIFICATION = gql`
  mutation CreateSpec(
    $resourceSpecification: ResourceSpecificationCreateParams!
  ) {
    createResourceSpecification(resourceSpecification: $resourceSpecification) {
      resourceSpecification {
        id
        name
        image
        note
      }
    }
  }
`

export const CREATE_UNIT = gql`
  mutation CreateUnit($unit: UnitCreateParams!) {
    createUnit(unit: $unit) {
      unit {
        id
        symbol
        label
      }
    }
  }
`

export const CREATE_PERSON = gql`
  mutation CreatePerson($person: AgentCreateParams!) {
    createPerson(person: $person) {
      agent {
        id
        name
      }
    }
  }
`

export const ASSOCIATE_MY_AGENT = gql`
  mutation AssociateMyAgent($id: ID!) {
    associateMyAgent(agentId: $id)
  }
`

export const CREATE_PROCESS = gql`
  mutation CreateProcess($process: ProcessCreateParams!) {
    createProcess(process: $process) {
      process {
        id
        name
      }
    }
  }
`
