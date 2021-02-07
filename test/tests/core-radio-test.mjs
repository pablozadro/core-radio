import CoreRadio from '../../src/index.js';


describe('CoreRadio', function() {
  
  describe('subscribe()', function() {
    beforeEach(function() {
      CoreRadio.restore();
    });

    it('should return if the topic it is not a string', function() {
      expect(CoreRadio.subscribe(3,()=>{})).toEqual(undefined);
    });

    it('should return if the callback it is not a Function', function() {
      expect(CoreRadio.subscribe('',[])).toEqual(undefined);
    });
    
    it('should create the topic if it is not exists', function() {
      expect(Object.prototype.hasOwnProperty.call(CoreRadio.topics, 'foo:bar')).toEqual(false);
      CoreRadio.subscribe('foo:bar', ()=>{});
      expect(Object.prototype.hasOwnProperty.call(CoreRadio.topics, 'foo:bar')).toEqual(true);
    });

    it('should add the callbacks to the topic', function() {
      CoreRadio.subscribe('foo:bar', ()=>{});
      CoreRadio.subscribe('foo:bar', ()=>{});
      expect(CoreRadio.topics['foo:bar'].length).toEqual(2);
    });

    it('should return the callback token ID', function() {
      let token = CoreRadio.subscribe('foo:bar', ()=>{});
      expect(typeof token).toEqual('number');
    });
  });


  describe('unsubscribe()', function() {
    beforeEach(function() {
      CoreRadio.restore();
    });

    it('should return if the topic it is not a string', function() {
      expect(CoreRadio.unsubscribe({},3)).toEqual(undefined);
    });

    it('should return if the topic does not exists', function() {
      expect(CoreRadio.unsubscribe('bar:baz',3)).toEqual(undefined);
    });

    it('should return if the token it is not a number', function() {
      expect(CoreRadio.unsubscribe('foo:bar','3')).toEqual(undefined);
    });

    it('should properly remove the callback from the topic', function() {
      let callback1 = () => {};
      let callback2 = () => {};
      let callback3 = () => {};
      CoreRadio.subscribe('foo:bar', callback1);
      let token2 = CoreRadio.subscribe('foo:bar', callback2);
      CoreRadio.subscribe('foo:bar', callback3);
      expect(CoreRadio.topics['foo:bar'].length).toEqual(3);
      CoreRadio.unsubscribe('foo:bar', token2);
      expect(CoreRadio.topics['foo:bar'].length).toEqual(2);
    });
  });


  describe('publish()', function() {
    beforeEach(function() {
      CoreRadio.restore();
    });
    
    it('should return if the topic it is not a string', function() {
      expect(CoreRadio.publish({})).toEqual(undefined);
    });

    it('should execute each callback for a given event', function() {
      let callback1 = jasmine.createSpy('callback1');
      let callback2 = jasmine.createSpy('callback2');
      CoreRadio.subscribe('foo:bar', callback1);
      CoreRadio.subscribe('foo:bar', callback2);
      CoreRadio.publish('foo:bar');
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });

    it('should pass the context properly to each callback', function() {
      let callback = jasmine.createSpy('callback1');
      let context = {id: 1};
      CoreRadio.subscribe('foo:bar', callback);
      CoreRadio.publish('foo:bar', context);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(context);
    });
  });


  describe('restore()', function() {
    it('should reset the Tower state', function() {
      CoreRadio.topics = {};
      CoreRadio.tokenID = 0;
      CoreRadio.subscribe('foo:bar', ()=>{});
      CoreRadio.subscribe('foo:baz', ()=>{});
      CoreRadio.restore();
      expect(CoreRadio.topics).toEqual({});
      expect(CoreRadio.tokenID).toEqual(0);
    });
  });
});

