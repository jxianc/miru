import type { CodegenConfig } from '@graphql-codegen/cli'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  documents: 'graphql/**/*.graphql',
  generates: {
    'generated/graphql.tsx': {
      // preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
    },
  },
}

export default config
