import { Type } from '@sinclair/typebox'
import { ErrorSchema } from './errors.js'

//---------------------------------------------------------------------
// Get All Contributions
//---------------------------------------------------------------------

export const ContributionOutputDtoSchema = Type.Object({
  createdAt: Type.String({ format: 'date-time' }),
  url: Type.String({ format: 'uri' }),
  title: Type.String(),
  type: Type.String(),
  repositoryName: Type.String(),
  repositoryUrl: Type.String({ format: 'uri' }),
})

export const GetAllContributionOutputDtoSchema = Type.Object({
  data: Type.Array(ContributionOutputDtoSchema),
  errors: Type.Array(ErrorSchema),
})
