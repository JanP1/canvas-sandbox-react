export type PersonInput = {
  id: string;
  name: string;
  spouse_id?: string;
  children_ids?: string[];
  parents_ids?: string[];
};

export const inputs = [
  // Generation 3 — Parents of Grandchild
  { id: '2', name: 'Parent A', children_ids: ['4'], spouse_id: '3', parents_ids: ['5', '6'] },
  { id: '3', name: 'Parent B', children_ids: ['4'], spouse_id: '2', parents_ids: ['7', '8'] },
  { id: '4', name: 'Grandchild', parents_ids: ['2', '3'] },

  // Generation 2 — Grandparents
  { id: '5', name: 'Great Grandparent A', children_ids: ['2'], spouse_id: '6', parents_ids: ['9', '10'] },
  { id: '6', name: 'Great Grandparent B', children_ids: ['2'], spouse_id: '5', parents_ids: ['11', '12'] },
  { id: '7', name: 'Great Grandparent C', children_ids: ['3'], spouse_id: '8', parents_ids: ['13', '14'] },
  { id: '8', name: 'Great Grandparent D', children_ids: ['3'], spouse_id: '7', parents_ids: ['15', '16'] },

  // Generation 1 — 2nd Great Grandparents
  { id: '9', name: '2nd Great Grandparent A', children_ids: ['5'], spouse_id: '10', parents_ids: ['17', '18'] },
  { id: '10', name: '2nd Great Grandparent B', children_ids: ['5'], spouse_id: '9', parents_ids: ['19', '20'] },
  { id: '11', name: '2nd Great Grandparent C', children_ids: ['6'], spouse_id: '12', parents_ids: ['21', '22'] },
  { id: '12', name: '2nd Great Grandparent D', children_ids: ['6'], spouse_id: '11', parents_ids: ['23', '24'] },

  { id: '13', name: '2nd Great Grandparent E', children_ids: ['7'], spouse_id: '14', parents_ids: ['25', '26'] },
  { id: '14', name: '2nd Great Grandparent F', children_ids: ['7'], spouse_id: '13', parents_ids: ['27', '28'] },
  { id: '15', name: '2nd Great Grandparent G', children_ids: ['8'], spouse_id: '16', parents_ids: ['29', '30'] },
  { id: '16', name: '2nd Great Grandparent H', children_ids: ['8'], spouse_id: '15', parents_ids: ['31', '32'] },

  // Generation 0 — 3rd Great Grandparents
  { id: '17', name: '3rd Great Grandparent A', children_ids: ['9'], spouse_id: '18', parents_ids: ['33', '34'] },
  { id: '18', name: '3rd Great Grandparent B', children_ids: ['9'], spouse_id: '17', parents_ids: ['35', '36'] },
  { id: '19', name: '3rd Great Grandparent C', children_ids: ['10'], spouse_id: '20', parents_ids: ['37', '38'] },
  { id: '20', name: '3rd Great Grandparent D', children_ids: ['10'], spouse_id: '19', parents_ids: ['39', '40'] },

  { id: '21', name: '3rd Great Grandparent E', children_ids: ['11'], spouse_id: '22', parents_ids: ['41', '42'] },
  { id: '22', name: '3rd Great Grandparent F', children_ids: ['11'], spouse_id: '21', parents_ids: ['43', '44'] },
  { id: '23', name: '3rd Great Grandparent G', children_ids: ['12'], spouse_id: '24', parents_ids: ['45', '46'] },
  { id: '24', name: '3rd Great Grandparent H', children_ids: ['12'], spouse_id: '23', parents_ids: ['47', '48'] },

  { id: '25', name: '3rd Great Grandparent I', children_ids: ['13'], spouse_id: '26', parents_ids: ['49', '50'] },
  { id: '26', name: '3rd Great Grandparent J', children_ids: ['13'], spouse_id: '25', parents_ids: ['51', '52'] },
  { id: '27', name: '3rd Great Grandparent K', children_ids: ['14'], spouse_id: '28', parents_ids: ['53', '54'] },
  { id: '28', name: '3rd Great Grandparent L', children_ids: ['14'], spouse_id: '27', parents_ids: ['55', '56'] },

  { id: '29', name: '3rd Great Grandparent M', children_ids: ['15'], spouse_id: '30', parents_ids: ['57', '58'] },
  { id: '30', name: '3rd Great Grandparent N', children_ids: ['15'], spouse_id: '29', parents_ids: ['59', '60'] },
  { id: '31', name: '3rd Great Grandparent O', children_ids: ['16'], spouse_id: '32', parents_ids: ['61', '62'] },
  { id: '32', name: '3rd Great Grandparent P', children_ids: ['16'], spouse_id: '31', parents_ids: ['63'] }, // ← only 1 parent (1st of 2)

  // Generation -1 — 4th Great Grandparents (final generation with mostly complete data)
  { id: '33', name: '4th Great Grandparent A', children_ids: ['17'], spouse_id: '34' },
  { id: '34', name: '4th Great Grandparent B', children_ids: ['17'], spouse_id: '33' },
  { id: '35', name: '4th Great Grandparent C', children_ids: ['18'], spouse_id: '36' },
  { id: '36', name: '4th Great Grandparent D', children_ids: ['18'], spouse_id: '35' },
  { id: '37', name: '4th Great Grandparent E', children_ids: ['19'], spouse_id: '38' },
  { id: '38', name: '4th Great Grandparent F', children_ids: ['19'], spouse_id: '37' },
  { id: '39', name: '4th Great Grandparent G', children_ids: ['20'], spouse_id: '40' },
  { id: '40', name: '4th Great Grandparent H', children_ids: ['20'], spouse_id: '39' },
  { id: '41', name: '4th Great Grandparent I', children_ids: ['21'], spouse_id: '42' },
  { id: '42', name: '4th Great Grandparent J', children_ids: ['21'], spouse_id: '41' },
  { id: '43', name: '4th Great Grandparent K', children_ids: ['22'], spouse_id: '44' },
  { id: '44', name: '4th Great Grandparent L', children_ids: ['22'], spouse_id: '43' },
  { id: '45', name: '4th Great Grandparent M', children_ids: ['23'], spouse_id: '46' },
  { id: '46', name: '4th Great Grandparent N', children_ids: ['23'], spouse_id: '45' },
  { id: '47', name: '4th Great Grandparent O', children_ids: ['24'], spouse_id: '48' },
  { id: '48', name: '4th Great Grandparent P', children_ids: ['24'], spouse_id: '47' },
  { id: '49', name: '4th Great Grandparent Q', children_ids: ['25'], spouse_id: '50' },
  { id: '50', name: '4th Great Grandparent R', children_ids: ['25'], spouse_id: '49' },
  { id: '51', name: '4th Great Grandparent S', children_ids: ['26'], spouse_id: '52' },
  { id: '52', name: '4th Great Grandparent T', children_ids: ['26'], spouse_id: '51' },
  { id: '53', name: '4th Great Grandparent U', children_ids: ['27'], spouse_id: '54' },
  { id: '54', name: '4th Great Grandparent V', children_ids: ['27'], spouse_id: '53' },
  { id: '55', name: '4th Great Grandparent W', children_ids: ['28'], spouse_id: '56' },
  { id: '56', name: '4th Great Grandparent X', children_ids: ['28'], spouse_id: '55' },
  { id: '57', name: '4th Great Grandparent Y', children_ids: ['29'], spouse_id: '58' },
  { id: '58', name: '4th Great Grandparent Z', children_ids: ['29'], spouse_id: '57' },
  { id: '59', name: '4th Great Grandparent AA', children_ids: ['30'], spouse_id: '60' },
  { id: '60', name: '4th Great Grandparent AB', children_ids: ['30'], spouse_id: '59' },
  { id: '61', name: '4th Great Grandparent AC', children_ids: ['31'], spouse_id: '62' },
  { id: '62', name: '4th Great Grandparent AD', children_ids: ['31'], spouse_id: '61' },
  { id: '63', name: '4th Great Grandparent AE', children_ids: ['32'] }, // ← second person with only 1 parent
];

