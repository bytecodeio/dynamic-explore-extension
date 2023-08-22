import {connection, scratch_schema} from './writebackConfig'

export const getApplication = async (path,sdk) => {
    const asyncFunction = async (path,sdk) => {
        const slugResponse = await sdk
            .ok(
            sdk.create_sql_query({
                connection_name: connection,
                sql: `SELECT * from ${scratch_schema}.cms_application where route = '${path}'`,
            })
            )
        const response = await sdk.ok(sdk.run_sql_query(slugResponse.slug, "inline_json"));

        return response
    }
    return asyncFunction(path,sdk);
}


export const getApplicationTabs = async (id,sdk) => {
    const asyncFunction = async (id,sdk) => {
        const slugResponse = await sdk
            .ok(
            sdk.create_sql_query({
                connection_name: connection,
                sql: `select t.*, template.layout_name 
                from ${scratch_schema}.cms_tab t
                INNER JOIN ${scratch_schema}.cms_template template on template.id = t.template_id where t.application_id = ${id}
                ORDER BY t.sort_order ASC`,
            })
            )
        const response = await sdk.ok(sdk.run_sql_query(slugResponse.slug, "inline_json"));

        return response
    }
    return asyncFunction(id,sdk);
}

export const getTabVisualizations = async (id,sdk) => {
    const asyncFunction = async (id,sdk) => {
        const slugResponse = await sdk
            .ok(
            sdk.create_sql_query({
                connection_name: connection,
                sql: `select * from ${scratch_schema}.cms_tab_visualization
                where tab_id = ${id};`,
            })
            )
        const response = await sdk.ok(sdk.run_sql_query(slugResponse.slug, "inline_json"));

        return response
    }
    return asyncFunction(id,sdk);
}