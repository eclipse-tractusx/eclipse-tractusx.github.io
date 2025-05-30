# Attribute Validation Rules

## 4.1 Materials

### 4.1.1 Substances of Concern

#### 4.1.1.1	Applicable (Substances of Concern)
Description: Indicates applicability of substances of concern as relevant attributes of the product materials.

* Regulatory Reference: Regulation (EU) 2024/1781 details substances of concern in product manufacturing and disposal processes, Article 2 and Article 7(5)(a).
* Validation Rule:
  * Type: String
  * Example: "true"
  * Mandatory: Yes
  * If „True“, then the following fields should be filled, if „False”, then empty fields are accepted
    * Logic: Must be either "true" or "false".

#### 4.1.1.2	Chemical ID (Substances of Concern)
Description: Represents chemical material name or numerical identifier, preferring IUPAC nomenclature.

* Regulatory Reference: Regulation regarding chemical naming practices outlined in Article 7(5)(a).
* Validation Rule:
  * Type: String
  * Example: "201-004-7"
  * Mandatory: Yes
  * Logic: Must be valid chemical identifier in accordance with IUPAC.

#### 4.1.1.3 List Type ID (Substances of Concern)
Description: Specifies the identification standard for substances, offering CAS, IUPAC, or EC selection.

* Regulatory Reference: Standardized substance identification highlighted in Article 7(5)(a).
