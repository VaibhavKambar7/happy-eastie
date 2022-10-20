import type { NextPage } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Resource, ResourceCategory } from '../../models/types'
import { useResources } from '../../hooks/useResources'
import { ResourcesDisplay } from '../../components/directory/ResourcesDisplay'
import { FormElement, Input } from '@nextui-org/react';
import { useResourcesDirectory } from '../../hooks/useResourcesDirectory'

const ResourceDirectory: NextPage = () => {
    const [searchQuery, setSearchQuery] = useState<string>("Search resources...")
    const [displayResources, setDisplayResources] = useState<Resource[]>([])
    const { requestedResources, additionalResources, isLoading, error } = useResources()

    useEffect(() => {
        setDisplayResources(requestedResources as Resource[])
    }, [requestedResources])

    useEffect(() => {
        console.log("GET UPDATED LIST OF RESOURCES BASED ON SEARCH QUERY HERE!")
    }, [searchQuery])

    if (error) return <div>{error.message}</div>
    if (isLoading) return <div>loading...</div>
    if (!requestedResources) return <div>Internal server error: could not load requested resources</div>
    if (!additionalResources) return <div>Internal server error: could not load additional resources</div>

    const updateSearchQuery = (e: ChangeEvent<FormElement>) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className={styles.container}>
            <h1>Resource Directory</h1>
            <Link href='/'>Back to Home</Link>

            <br />
            <br />

            <Input
                size="xl"
                aria-label="Search"
                type="search"
                placeholder={searchQuery}
                onChange={updateSearchQuery}
            />

            <br />
            <br />

            <div>
                {Object.values(ResourceCategory).map(c =>
                    <label key={c}>
                        <input
                            type="checkbox"
                            name="category"
                            value={c}
                        /> {c}
                        <br />
                    </label>
                )}
            </div>

            <ResourcesDisplay resources={displayResources} />

            <br />

            {/* TODO: Currently just goes back to home page */}
            <Link href='/'>Log Out</Link>

            <br />
            <br />
        </div>
    )
}

export default ResourceDirectory
