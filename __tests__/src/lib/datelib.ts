import {wasYesterday} from "lib/datelib";


describe("wasYesterday", function() {
    it("should decide 5/21 came before 5/22", function() {
        let today = new Date(2017, 5, 22);
        let yesterday = new Date(2017, 5, 21);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 5/22 did not come before 5/21", function() {
        let today = new Date(2017, 5, 22);
        let yesterday = new Date(2017, 5, 21);
        
        expect(wasYesterday(today, yesterday)).toEqual(false);
    });
    
    it("should decide 4/30 came before 5/1", function() {
        let today = new Date(2017, 5, 1);
        let yesterday = new Date(2017, 4, 30);
        
        expect(wasYesterday(yesterday, todayy)).toEqual(true);
    });
    
    it("should decide 7/31 came before 8/1", function() {
        let today = new Date(2017, 8, 1);
        let yesterday = new Date(2017, 7, 31);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 8/31 came before 9/1", function() {
        let today = new Date(2017, 9, 1);
        let yesterday = new Date(2017, 8, 31);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 2/28/2017 came before 3/1/2017", function() {
        let today = new Date(2017, 3, 1);
        let yesterday = new Date(2017, 2, 28);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 2/28/2016 did not come before 3/1/2016", function() {
        let today = new Date(2016, 3, 1);
        let yesterday = new Date(2016, 2, 28);
        
        expect(wasYesterday(yesterday, today)).toEqual(false);
    });
    
    it("should decide 2/29/2016 came before 3/1/2016", function() {
        let today = new Date(2016, 3, 1);
        let yesterday = new Date(2016, 2, 29);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 2/29/2000 came before 3/1/2000", function() {
        let today = new Date(2000, 3, 1);
        let yesterday = new Date(2000, 2, 29);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });
    
    it("should decide 12/31/2016 came before 1/1/2017", function() {
        let today = new Date(2017, 1, 1);
        let yesterday = new Date(2016, 12, 31);
        
        expect(wasYesterday(yesterday, today)).toEqual(true);
    });

});
