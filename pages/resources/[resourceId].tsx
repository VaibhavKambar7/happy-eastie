import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';

import { useResource } from '../../hooks/useResource';
import { useRouter } from 'next/router';
import { ResourceDisplay } from '../../components/resources/ResourceDisplay';

const ResourcePage: NextPage = () => {
  const router = useRouter()
  const {resourceId} = router.query
  const {resource, isLoading, error} = useResource(resourceId)

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>loading...</div>
  if (!resource) return <div>Internal server error: invalid resource loaded</div>

  return (
    <div className={styles.container}>
      <ResourceDisplay resource={resource}/>
      <Link href='/resources'>Back to Results page</Link>
    </div>
  )

  // Note: maybe it shouldn't always go back to resources?
}


export default ResourcePage
