## this is react + umi + dva demo
## array 多种格式去重
    let a = [[1,2,3,[12,11,null]],1,2,'1','4',null,'null',undefined,{a:1,a:{a:22}}]
    
    // typeof null  = 'object'
    // typeof undefined = 'undefined'
    // typeof NaN = 'number'
    function f (obj) {
    	let a = []
    	function fn(obj) {
    		if(typeof obj == 'object' && obj !== null) {
    			for(let k in obj) {
    				fn(obj[k])
    			}
    		}else {
    			a.push(obj)
    		}
    	}
    	fn(obj)
    	console.log(a)
    	return Array.from(new Set(a))
    }
