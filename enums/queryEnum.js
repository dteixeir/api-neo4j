// pattern for fuzzy matching name
//start n = node(*) where n.Name =~ '.*SUBSTRING.*' return n.Name, n;

// * Note *
// #= # is not cypher! Using it as a way to identify what will be replaced by pattern matching
// later to swap out for route params 

module.exports = {
  MOVIE: {
    BY_TITLE: `MATCH(n:Movie) 
               WHERE n.title =~ '.*(?i)#=title#.*'
               RETURN n`,
    ACTORS_ACTED_IN: `MATCH (a:Actor)-[:ACTS_IN]->(m:Movie)
                      WHERE m.title =~ '(?i)#=title#.*'
                      RETURN a`
  },
  AUTH: {
    AUTHENTICATE: `MATCH(n:User) 
                   WHERE n.username = '#=username#'
                   return n`,
    REGISTER: {
      CREATE: `CREATE (u:User {
                  firstName:'#=firstName#', 
                  lastName:'#=lastName#', 
                  username:'#=username#',
                  password:'#=password#'
                })`,
      CHECK_USERNAME: `Match (u:User)
                       WHERE u.username = '#=username#'
                       Return Count(u) > 0`
    }
  },
  ERROR: {
    LOG_ERROR: `CREATE (n:Error { 
                  error: '#=error#', 
                  fileName: '#=fileName#',
                  status: #=status#
                })`
  }
}