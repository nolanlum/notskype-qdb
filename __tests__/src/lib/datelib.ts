import {wasYesterday} from "lib/datelib";


describe("wasYesterday", function() {
    it("should decide 5/21 came before 5/22", function() {
        let today = new Date(2017, 05, 22);
        let yesterday = new Date(2017, 05, 21);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 5/22 did not come before 5/21", function() {
        let today = new Date(2017, 05, 22);
        let yesterday = new Date(2017, 05, 21);
        
        expect(wasYesterday(today, yesterday)).toEqual(false);
    });
    
    it("should decide 4/30 came before 5/1", function() {
        let today = new Date(2017, 05, 01);
        let yesterday = new Date(2017, 04, 30);
        
        expect(wasYesterday(yesterday, todayy)).toEqual(true);
    });
    
    it("should decide 7/31 came before 8/1", function() {
        let today = new Date(2017, 08, 01);
        let yesterday = new Date(2017, 07, 31);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 8/31 came before 9/1", function() {
        let today = new Date(2017, 09, 01);
        let yesterday = new Date(2017, 08, 31);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 2/28/2017 came before 3/1/2017", function() {
        let today = new Date(2017, 03, 01);
        let yesterday = new Date(2017, 02, 28);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 2/28/2016 did not come before 3/1/2016", function() {
        let today = new Date(2016, 03, 01);
        let yesterday = new Date(2016, 02, 28);
        
        expect(wasYesterday(yesterday, today)).toEqual(false);
    });
    
    it("should decide 2/29/2016 came before 3/1/2016", function() {
        let today = new Date(2016, 03, 01);
        let yesterday = new Date(2016, 02, 29);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 2/29/2000 came before 3/1/2000", function() {
        let today = new Date(2000, 03, 01);
        let yesterday = new Date(2000, 02, 29);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 12/31/2016 came before 1/1/2017", function() {
        let today = new Date(2017, 01, 01);
        let yesterday = new Date(2016, 12, 31);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });

});
